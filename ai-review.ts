import { Octokit } from '@octokit/rest';
import { OpenAI } from 'openai';
import fs from 'fs';
import fetch from 'node-fetch'; // Import node-fetch

// Polyfill fetch globally for OpenAI SDK
// globalThis.fetch = fetch;

// Initialize OpenAI API and GitHub API client (Octokit)
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'] as string, // Access environment variable using bracket notation
  fetch: fetch as any, // Explicitly pass fetch to OpenAI client
});

const octokit = new Octokit({
  auth: process.env['GITHUB_TOKEN'] as string, // Access environment variable using bracket notation
  fetch, // Explicitly pass fetch to Octokit if needed
});

// Get the GitHub repository and event details from the environment variables
const { GITHUB_REPOSITORY, GITHUB_EVENT_PATH } = process.env;
const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH as string, 'utf8'));
const prNumber = event.number;
const [owner, repo] = GITHUB_REPOSITORY!.split('/');

// Fetch the PR diff (i.e., the changes made in the PR)
async function getPRDiff(): Promise<string> {
  const { data } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: {
      format: 'diff', // or "patch"
    },
  });

  if (typeof data !== 'string') {
    throw new Error('Unexpected response: diff is not a string');
  }
  return data;
}

// Send the PR diff to OpenAI to get a code review
async function reviewCode(diff: string): Promise<string> {
  const prompt = `
You are a senior software engineer. Please review the following pull request diff.
Focus on bugs, security issues, performance issues, and code quality.
Return your answer in markdown format with clear sections and bullet points.

Diff:
${diff}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4', // Using GPT-4 model
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content || ''; // Return the AI-generated review comment
}

// Post the AI review comment on the PR
async function postReviewComment(reviewComment: string): Promise<void> {
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: reviewComment, // The AI-generated review comment
  });
}

// Main function to get the diff, send it to OpenAI, and post the review comment
async function main(): Promise<void> {
  try {
    const diff = await getPRDiff(); // Fetch the PR diff
    const reviewComment = await reviewCode(diff); // Get AI's review of the diff
    await postReviewComment(reviewComment); // Post the review comment on the PR
  } catch (error) {
    console.error('Error during AI code review:', error);
  }
}

main();
