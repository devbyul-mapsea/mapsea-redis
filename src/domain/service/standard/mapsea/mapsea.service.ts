import { standard_cli } from '../../../../core/config/redis';
import {
  MAPSEA_API_NAMESPACE,
  MAPSEA_API_SUB_NAMESPACE,
  MAPSEA_API_EXPIRE,
  REDIS_ERROR_CODE,
  REDIS_ERROR_MESSAGE,
} from '../../../../core/enum';
import { ERROR_CODE_BUILDER } from '../../../../core/error';

export class MapseaApiService {
  private static namespace = MAPSEA_API_NAMESPACE.MAPSEA;

  private static getNameSpace = (id: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace;
  };

  private static getKey = (id: string, key: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace + ':' + key;
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

      // await standard_cli.del(redis_key);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static setCompanyRestPwdKey = async ({
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

  static getCompanyRestPwdKey = async ({ key }: { key: string }) => {
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
