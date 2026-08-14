# Rain AI Project operating rules

## Production deployment

- All production deployments must go through GitHub `main` and the connected Vercel automatic deployment.
- Never deploy directly to Vercel with `vercel --prod`, `vercel deploy --prod`, deployment promotion, or manual alias reassignment.
- This rule also applies to emergency restoration. Expedite the GitHub workflow instead of bypassing it.
- Before reporting a deployment complete, confirm all of the following:
  1. Every production file is tracked by Git.
  2. The intended commit exists on GitHub `main`.
  3. Vercel's automatic deployment from that `main` commit has completed.
  4. The production URL returns the expected status and content.
- A local file or a direct Vercel upload is never sufficient evidence that a production change is safely published.

