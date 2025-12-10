// const { Octokit } = require('@octokit/rest');
// const { OpenAI } = require('openai');
// const fs = require('fs');
import { Octokit } from '@octokit/rest';
import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// GET info about PR
const { GITHUB_REPOSITORY, GITHUB_EVENT_PATH } = process.env;
const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH, 'utf8'));
const prNumber = event.number;
const [owner, repo] = GITHUB_REPOSITORY.split('/');

// GET diff of PR
async function getPRDiff() {
  const diff = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: { format: 'diff' },
  });

  return diff.data;
}

// Call OpenAI to review code
async function reviewCode(diff) {
  const prompt = `
You are a senior software engineer. Please review the following pull request diff.
Focus on bugs, security issues, performance issues, and code quality.
Return your answer in markdown format with clear sections and bullet points.

Diff:
${diff}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

// POST review comment on PR
async function postReviewComment(reviewComment) {
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: reviewComment,
  });
}

async function main() {
  const diff = await getPRDiff();
  const reviewComment = await reviewCode(diff);
  await postReviewComment(reviewComment);
}

main().catch(console.error);
