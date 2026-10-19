import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export class EnvConfig {
  public static readonly BASE_URL: string =
    process.env.BASE_URL || 'https://spartan-app-new-nonsecure.onrender.com';

  public static readonly DEFAULT_TIMEOUT: number = parseInt(
    process.env.DEFAULT_TIMEOUT || '30000',
    10
  );

  public static readonly EXPECT_TIMEOUT: number = parseInt(
    process.env.EXPECT_TIMEOUT || '10000',
    10
  );

  public static readonly HEADLESS: boolean =
    process.env.HEADLESS !== 'false';
}
