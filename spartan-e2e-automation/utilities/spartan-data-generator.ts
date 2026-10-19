import { faker } from '@faker-js/faker';
import { Spartan, SpartanGender } from '../models/spartan.model.js';

/**
 * Utility class leveraging Faker to generate realistic test data
 * for Spartan UI test suites.
 */
export class SpartanDataGenerator {
  /**
   * Generates a fully valid Spartan entity with:
   * - Realistic First Name (length 3 - 15 chars)
   * - Valid Gender ('MALE' or 'FEMALE')
   * - 10-digit numeric phone number
   */
  public static generateValidSpartan(preferredGender?: SpartanGender): Spartan {
    const gender: SpartanGender = preferredGender ?? (faker.helpers.arrayElement(['MALE', 'FEMALE']) as SpartanGender);
    const firstName = gender === 'MALE' ? faker.person.firstName('male') : faker.person.firstName('female');
    
    // Ensure name is clean without special characters and 3-20 characters long
    const cleanName = firstName.replace(/[^a-zA-Z]/g, '').slice(0, 15) || 'SpartanUser';
    
    // Generate valid 10-digit numeric phone (e.g., 5001234567)
    const phone = faker.string.numeric({ length: 10, allowLeadingZeros: false });

    return {
      name: cleanName,
      gender,
      phone,
    };
  }

  /**
   * Generates a valid Male Spartan
   */
  public static generateMaleSpartan(): Spartan {
    return this.generateValidSpartan('MALE');
  }

  /**
   * Generates a valid Female Spartan
   */
  public static generateFemaleSpartan(): Spartan {
    return this.generateValidSpartan('FEMALE');
  }

  /**
   * Generates a Spartan with a custom name prefix (helpful for search & filtering tests)
   */
  public static generateSpartanWithPrefix(prefix: string, gender?: SpartanGender): Spartan {
    const spartan = this.generateValidSpartan(gender);
    return {
      ...spartan,
      name: `${prefix}${faker.string.alphanumeric(5)}`,
    };
  }

  /**
   * Generates invalid test data for negative validation testing
   */
  public static generateInvalidPhoneSpartan(): Spartan {
    return {
      name: faker.person.firstName(),
      gender: 'MALE',
      phone: '12345', // Invalid: only 5 digits instead of 10
    };
  }

  /**
   * Generates a Spartan with too short name (1 character)
   */
  public static generateShortNameSpartan(): Spartan {
    return {
      name: 'A',
      gender: 'FEMALE',
      phone: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    };
  }

  /**
   * Generates a Spartan with too long name (> 30 characters)
   */
  public static generateLongNameSpartan(): Spartan {
    return {
      name: 'VeryLongSpartanNameThatExceedsThirtyCharactersLimit',
      gender: 'MALE',
      phone: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    };
  }

  /**
   * Generates a valid SpartanDTO for REST API payloads (using 'Male' | 'Female').
   */
  public static generateApiSpartan(preferredGender?: 'Male' | 'Female'): {
    name: string;
    gender: 'Male' | 'Female';
    phone: string;
  } {
    const gender: 'Male' | 'Female' =
      preferredGender ?? (faker.helpers.arrayElement(['Male', 'Female']) as 'Male' | 'Female');
    const firstName =
      gender === 'Male' ? faker.person.firstName('male') : faker.person.firstName('female');
    const cleanName = firstName.replace(/[^a-zA-Z]/g, '').slice(0, 15) || 'SpartanApi';
    const phone = faker.string.numeric({ length: 10, allowLeadingZeros: false });

    return {
      name: cleanName,
      gender,
      phone,
    };
  }

  /**
   * Generates a SpartanDTO with a custom prefix for API testing.
   */
  public static generateApiSpartanWithPrefix(
    prefix: string,
    preferredGender?: 'Male' | 'Female'
  ): {
    name: string;
    gender: 'Male' | 'Female';
    phone: string;
  } {
    const spartan = this.generateApiSpartan(preferredGender);
    return {
      ...spartan,
      name: `${prefix}${faker.string.alphanumeric(6)}`,
    };
  }
}
