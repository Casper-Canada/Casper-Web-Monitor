import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';

// Initialize Slack WebClient with your bot token
const slackClient = new WebClient('');

export async function GET(request) {
  try {
    // const { channel, message } = await request.json();

    const channel = '#casper-monitor-test';
    const message = 'Hello World!';

    // Validate input
    if (!channel || !message) {
      return NextResponse.json({ error: 'Channel and message are required' }, { status: 400 });
    }

    // Send message to Slack channel
    const result = await slackClient.chat.postMessage({
      channel: channel, // Channel name (e.g., '#bot-test') or ID
      text: message,
    });

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('Error sending Slack message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}