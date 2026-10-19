import { APIRequestContext, APIResponse } from '@playwright/test';
import {
  SpartanDTO,
  SpartanPartialUpdateDTO,
  SpartanSearchQueryParams,
  ResponseWrapper,
  SpartanListContainer,
} from '../models/spartan-api.model.js';

/**
 * World-class API Client wrapping Playwright's APIRequestContext
 * for the Spartan REST API (/api/v2/*).
 */
export class SpartanApiClient {
  readonly request: APIRequestContext;
  readonly basePath: string;

  constructor(request: APIRequestContext, basePath = '/api/v2') {
    this.request = request;
    this.basePath = basePath;
  }

  /**
   * GET /api/v2/spartans
   * Retrieves all Spartan records.
   */
  public async getAllSpartans(): Promise<APIResponse> {
    return this.request.get(`${this.basePath}/spartans`, {
      headers: { Accept: 'application/json' },
    });
  }

  /**
   * GET /api/v2/spartans/{id}
   * Retrieves a single Spartan record by ID.
   */
  public async getSpartanById(id: number | string): Promise<APIResponse> {
    return this.request.get(`${this.basePath}/spartans/${id}`, {
      headers: { Accept: 'application/json' },
    });
  }

  /**
   * POST /api/v2/spartans
   * Creates a new Spartan record.
   */
  public async createSpartan(payload: SpartanDTO | Record<string, any>): Promise<APIResponse> {
    return this.request.post(`${this.basePath}/spartans`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * PUT /api/v2/spartans/{id}
   * Full update of a Spartan record.
   */
  public async updateSpartan(
    id: number | string,
    payload: SpartanDTO | Record<string, any>
  ): Promise<APIResponse> {
    return this.request.put(`${this.basePath}/spartans/${id}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * PATCH /api/v2/spartans/{id}
   * Partial update of specific fields on a Spartan record.
   */
  public async patchSpartan(
    id: number | string,
    payload: SpartanPartialUpdateDTO | Record<string, any>
  ): Promise<APIResponse> {
    return this.request.patch(`${this.basePath}/spartans/${id}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * DELETE /api/v2/spartans/{id}
   * Deletes a Spartan record by ID.
   */
  public async deleteSpartan(id: number | string): Promise<APIResponse> {
    return this.request.delete(`${this.basePath}/spartans/${id}`, {
      headers: { Accept: 'application/json' },
    });
  }

  /**
   * GET /api/v2/spartans/search
   * Queries Spartans using query parameters (nameContains, gender).
   */
  public async searchSpartans(params?: SpartanSearchQueryParams): Promise<APIResponse> {
    const queryParams: Record<string, string> = {};
    if (params?.nameContains !== undefined) {
      queryParams['nameContains'] = params.nameContains;
    }
    if (params?.gender !== undefined) {
      queryParams['gender'] = params.gender;
    }

    return this.request.get(`${this.basePath}/spartans/search`, {
      params: queryParams,
      headers: { Accept: 'application/json' },
    });
  }

  /**
   * GET /api/v2/hello
   * Health check / greeting endpoint returning plain text.
   */
  public async getHello(): Promise<APIResponse> {
    return this.request.get(`${this.basePath}/hello`, {
      headers: { Accept: 'text/plain' },
    });
  }

  /**
   * Helper to deserialize JSON response bodies with strong typing.
   */
  public static async parseJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }
}
