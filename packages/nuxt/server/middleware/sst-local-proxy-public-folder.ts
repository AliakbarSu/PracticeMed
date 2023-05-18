/**
 * This is needed when running `sst start`, so client-side assets can be loaded.
 */
import fs from 'fs'
import path from 'path'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  /**
   * process.env.IS_LOCAL is set when we are running `sst start`.
   * Therefore, we know when we need to proxy the assets to the local files
   */
  if (!process.env.IS_LOCAL) {
    return
  }

  const url = event.node.req.url || ''
  /**
   * It is nuxt asset ?
   */
  const matches = url?.match(/^\/_nuxt\/(.*)/)

  if (!matches) {
    return
  }

  /**
   * Get the requested asset from the disk
   */
  const contents = fs.readFileSync(
    path.resolve(`./packages/nuxt/.output/public/_nuxt/${matches[1]}`),
    {
      encoding: 'utf8'
    }
  )
  let mimeType: string

  if (/\.m?js$/.test(url)) {
    mimeType = 'application/javascript'
  } else if (/\.css$/.test(url)) {
    mimeType = 'text/css'
  } else if (/\.ico$/.test(url)) {
    mimeType = 'image/x-icon'
  } else {
    // Here we could improve the mimeType parsing
    mimeType = 'text/html'
  }

  event.node.res.setHeader('Content-Type', mimeType)
  return contents
})
