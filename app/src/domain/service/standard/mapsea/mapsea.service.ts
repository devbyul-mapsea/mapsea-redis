import axios from 'axios';
import { standard_cli } from '../../../../core/config/redis';
import {
  MAPSEA_API_NAMESPACE,
  MAPSEA_API_SUB_NAMESPACE,
  MAPSEA_API_EXPIRE,
  REDIS_ERROR_CODE,
  REDIS_ERROR_MESSAGE,
} from '../../../../core/enum';
import { ERROR_CODE_BUILDER } from '../../../../core/error';
import dotEnv from '../../../../core/config/dotenv';

export class MapseaApiService {
  private static namespace = MAPSEA_API_NAMESPACE.MAPSEA;
  private static api = axios.create({
    baseURL: dotEnv.url.mapsea.sso,
  });

  private static getNameSpace = (id: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace;
  };

  private static getKey = (id: string, key: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace + ':' + key;
  };

  static getVerfiyJwtToken = async (jwt: string): Promise<any> => {
    const url = 'token/validation/jwt';

    const headers = { Authorization: `Bearer ${jwt}` };
    const { data } = await this.api.get(url, { headers });

    return data;
  };

  static setRefreshTokenAccessToken = async ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.JWT_REFRESH_TOKEN;
      const redis_key = this.getKey(sub_namespace, key);
      const key_check = await standard_cli.exists(redis_key);

      const { data } = await this.getVerfiyJwtToken(value);
      const { id, type } = data;

      // 최초 로그인 한 경우
      if (key_check === 0) {
        // Refresh Token 유효성 검사
        const { data } = await this.getVerfiyJwtToken(key);

        // Refresh Token 남은 시간 확인
        const { exp } = data;
        const now_unix_time = new Date().getTime() / 1000;
        const redis_ttl = Math.round(exp - now_unix_time);
        const hSetValue = { act: value, id, type };
        // Redis 저장
        await standard_cli.hSet(redis_key, hSetValue);
        await standard_cli.expire(redis_key, redis_ttl);
      }
      // 토큰을 재발급 받은 경우 { 추가적인 로직 필요  KEEPTTL 정상작동 하는지 확인 해야함 }
      else {
        await standard_cli.hSet(redis_key, 'act', value, { KEEPTTL: true });
      }
    } catch (error) {
      throw error;
    }
  };

  static getRefreshTokenAccessToken = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.JWT_REFRESH_TOKEN;
      const redis_key = this.getKey(sub_namespace, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DATA_NOT_FOUND_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      return await standard_cli.hGetAll(redis_key);
    } catch (error) {
      throw error;
    }
  };

  static deleteRefreshTokenAccessToken = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.JWT_REFRESH_TOKEN;
      const redis_key = this.getKey(sub_namespace, key);

      await standard_cli.del(redis_key);
    } catch (error) {
      throw error;
    }
  };

  static setUserRestPwdKey = async ({
    key,
    value,
  }: {
    key: string;
    value: {
      key: string;
      iv: string;
      encrypted: string;
    };
  }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.USER_RESET_PWD;
      const redis_key = this.getKey(sub_namespace, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check > 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DUPLICATE_KEY_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DUPLICATE_KEY_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      const bool = await standard_cli.hSet(redis_key, value);

      if (bool === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.INSERTION_FAILED_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.INSERTION_FAILED_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      await standard_cli.expire(redis_key, MAPSEA_API_EXPIRE.SET_RESET_PWD_KEY);
    } catch (error) {
      throw error;
    }
  };

  static getUserRestPwdKey = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.USER_RESET_PWD;
      const redis_key = this.getKey(sub_namespace, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DATA_NOT_FOUND_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      const data = await standard_cli.hGetAll(redis_key);

      await standard_cli.del(redis_key);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static setCompanyResetPwdKey = async ({
    key,
    value,
  }: {
    key: string;
    value: {
      key: string;
      iv: string;
      encrypted: string;
    };
  }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.COMPANY_RESET_PWD;
      const redis_key = this.getKey(sub_namespace, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check > 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DUPLICATE_KEY_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DUPLICATE_KEY_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      const bool = await standard_cli.hSet(redis_key, value);

      if (bool === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.INSERTION_FAILED_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.INSERTION_FAILED_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      await standard_cli.expire(redis_key, MAPSEA_API_EXPIRE.SET_RESET_PWD_KEY);
    } catch (error) {
      throw error;
    }
  };

  static getCompanyResetPwdKey = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = MAPSEA_API_SUB_NAMESPACE.COMPANY_RESET_PWD;
      const redis_key = this.getKey(sub_namespace, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DATA_NOT_FOUND_ERROR)
          .setData({ namespace: this.getNameSpace(sub_namespace), key })
          .build();
      }

      const data = await standard_cli.hGetAll(redis_key);

      await standard_cli.del(redis_key);

      return data;
    } catch (error) {
      throw error;
    }
  };
}
