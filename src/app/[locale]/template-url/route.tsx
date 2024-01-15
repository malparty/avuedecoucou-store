/* eslint-disable max-len */
import { NextResponse } from 'next/server';

const REQUIRE_ENV_VARS = false;

const TITLE = 'A Vue de Coucou, la boutique';
const DESCRIPTION = 'Commandez en ligne mes plus belles photos!';
const REPO_TEAM = 'malparty';
const REPO_NAME = 'avuedecoucou-store';

export function GET() {
  const url = new URL('https://vercel.com/new/clone');

  url.searchParams.set('demo-title', TITLE);
  url.searchParams.set('demo-description', DESCRIPTION);
  url.searchParams.set('demo-url', 'https://photos.malparty.com');
  url.searchParams.set('demo-description', DESCRIPTION);
  url.searchParams.set('demo-image', 'https://photos.malparty.com/template-image-tight');
  url.searchParams.set('project-name', TITLE);
  url.searchParams.set('repository-name', REPO_NAME);
  url.searchParams.set('repository-url', `https://github.com/${REPO_TEAM}/${REPO_NAME}`);
  url.searchParams.set('from', 'templates');
  url.searchParams.set('skippable-integrations', '1');
  if (REQUIRE_ENV_VARS) {
    url.searchParams.set('env-link', 'BLANK');
    url.searchParams.set('env', [
      'NEXT_PUBLIC_SITE_TITLE',
    ].join(','));
  }
  url.searchParams.set('teamCreateStatus', 'hidden');

  return NextResponse.json(url.toString());
}
