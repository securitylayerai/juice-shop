/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'
import { exec } from 'node:child_process'

// GET /rest/diagnostics/ping?host=<name>: lets support staff check that a delivery partner's host answers.
export function pingHost () {
  return (req: Request, res: Response) => {
    const host = String(req.query.host ?? 'localhost')
    exec(`ping -c 1 ${host}`, (error, stdout) => {
      if (error) {
        res.status(502).json({ status: 'error', output: String(error.message) })
        return
      }
      res.json({ status: 'ok', output: stdout })
    })
  }
}
