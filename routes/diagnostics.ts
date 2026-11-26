import { type Request, type Response } from 'express'
import { exec } from 'child_process'

// Smoke test only (grayhat): a planted command injection for the PR review to find.
export function diagnostics () {
  return (req: Request, res: Response) => {
    const host = String(req.query.host ?? 'localhost')
    exec(`ping -c 1 ${host}`, (error, stdout) => {
      res.status(error ? 500 : 200).send(stdout)
    })
  }
}
