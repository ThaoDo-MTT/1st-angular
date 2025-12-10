import { Octokit } from '@octokit/rest';
import { OpenAI } from 'openai';
import * as fs from 'fs';

const openai = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] as string });
const octokit = new Octokit({ auth: process.env['GITHUB_TOKEN'] as string });

const { GITHUB_REPOSITORY, GITHUB_EVENT_PATH } = process.env;
const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH as string, 'utf8'));
const prNumber = event.number as number;
const [owner, repo] = (GITHUB_REPOSITORY as string).split('/');

async function getPRDiff(): Promise<string> {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    owner,
    repo,
    pull_number: prNumber,
    headers: { accept: 'application/vnd.github.v3.diff' },
  });
  if (typeof data !== 'string') {
    throw new Error('Unexpected response: diff is not a string');
  }
  return data;
}

async function reviewCode(diff: string): Promise<string> {
  const prompt = `You are a senior software engineer. Please review the following pull request diff.
Focus on bugs, security issues, performance issues, and code quality.
Return your answer in markdown format with clear sections and bullet points.

Diff:
${diff}`;
  const model = process.env['OPENAI_MODEL'] ?? 'gpt-4o-mini';
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0]?.message?.content ?? '';
}

async function postReviewComment(reviewComment: string): Promise<void> {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: reviewComment,
  });
}

async function main(): Promise<void> {
  try {
    const diff = await getPRDiff();
    const reviewComment = await reviewCode(diff);
    await postReviewComment(reviewComment);
  } catch (error) {
    console.error('Error during AI code review:', error);
    process.exitCode = 1;
  }
}

main();
