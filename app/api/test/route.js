import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import puppeteer from 'puppeteer';

// Initialize Slack WebClient with your bot token
const slackClient = new WebClient('');

export async function GET(request) {
  try {
    // const { channel, message } = await request.json();

    // const channel = '#casper-monitor-test';
    // const message = 'Hello World!';
    //
    // // Validate input
    // if (!channel || !message) {
    //   return NextResponse.json({ error: 'Channel and message are required' }, { status: 400 });
    // }
    //
    // // Send message to Slack channel
    // const result = await slackClient.chat.postMessage({
    //   channel: channel, // Channel name (e.g., '#bot-test') or ID
    //   text: message,
    // });
    //
    // return NextResponse.json({ success: true, result }, { status: 200 });

    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });

    try {
      const page = await browser.newPage();
      await page.goto('https://casper.ca/en/mattresses', {
        waitUntil: 'domcontentloaded',
        args: [`--window-size=1400,1080`],
        defaultViewport: {
          width:1400,
          height:1080
        }
      });
      await page.waitForSelector('[href^="mattresses/the-casper"]');
      await page.click('[href^="mattresses/the-casper"]');
      await page.waitForSelector('.self-end.btn-primary.w-full');
      await page.click('.self-end.btn-primary.w-full');
      await page.waitForSelector('#non-exist');
    } finally {
      // await browser.close();
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending Slack message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}