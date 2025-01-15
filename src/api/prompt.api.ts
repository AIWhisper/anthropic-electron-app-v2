import { ANTHROPIC_CONFIG } from '@/api/config';
import { ApiSettingOptions } from '@/typings/common';

export interface PromptRequest extends ApiSettingOptions {
  prompt: string;
  signal?: AbortSignal;
}

export const submitPrompt = async ({
  model,
  temperature,
  topK,
  topP,
  apiKey,
  maxTokens,
  prompt,
  signal,
}: PromptRequest) => {
  const formattedPrompt = `\n\nHuman: ${prompt}\n\nAssistant:`;

  const requestBody = {
    model,
    prompt: formattedPrompt,
    temperature,
    top_k: topK,
    top_p: topP,
    max_tokens_to_sample: maxTokens,
    stop_sequences: ['\n\nHuman:'],
    stream: true,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'anthropic-api-key': apiKey,
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'x-api-key': apiKey,
    },
    signal,
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(
      `${ANTHROPIC_CONFIG.anthropicApiPrefix}/complete`,
      requestOptions,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(
          errorJson.error?.message || `API Error: ${response.status}`,
        );
      } catch (e) {
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    }

    return response;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};