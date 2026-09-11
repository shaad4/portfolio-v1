import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'shaad4';

const QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN environment variable is not set.' },
      { status: 500 },
    );
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } }),
      // Revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `GitHub API error: ${res.status} — ${text}` },
        { status: res.status },
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json({ error: json.errors[0].message }, { status: 400 });
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    // Normalize contributionLevel enum to 0–4 integers
    const levelMap: Record<string, number> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const weeks = calendar.weeks.map((week: any) => ({
      days: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: typeof day.contributionLevel === 'string'
          ? levelMap[day.contributionLevel] ?? 0
          : day.contributionLevel,
      })),
    }));

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
