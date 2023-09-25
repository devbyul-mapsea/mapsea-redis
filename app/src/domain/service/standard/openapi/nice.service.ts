import { standard_cli } from '../../../../core/config/redis';
import {
  NICE_API_EXPIRE,
  NICE_API_NAMESPACE,
  NICE_API_SUB_NAMESPACE,
  REDIS_ERROR_CODE,
  REDIS_ERROR_MESSAGE,
} from '../../../../core/enum';
import { ERROR_CODE_BUILDER } from '../../../../core/error';

export class OpenApiNiceService {
  private static namespace = NICE_API_NAMESPACE.NICE;

  private static getNameSpace = (id: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace;
  };

  private static getKey = (id: string, key: string) => {
    const sub_namespace = id;

    return this.namespace + ':' + sub_namespace + ':' + key;
  };

  static setNicePassKey = async ({
    key,
    value,
  }: {
    key: string;
    value: {
      key: string;
      iv: string;
      req_no: string;
    };
  }) => {
    try {
      const sub_namespace = NICE_API_SUB_NAMESPACE.ENCRYPT;
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

      await standard_cli.expire(redis_key, NICE_API_EXPIRE.SET_NICE_PASS_KEY);
    } catch (error) {
      throw error;
    }
  };

  static getNicePassKey = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = NICE_API_SUB_NAMESPACE.ENCRYPT;
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

      return data;
    } catch (error) {
      throw error;
    }
  };

  static setNiceUserInfo = async ({
    key,
    value,
  }: {
    key: string;
    value: {
      key: string;
      iv: string;
    };
  }) => {
    try {
      const sub_namespace = NICE_API_SUB_NAMESPACE.USER_INFO;
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

      await standard_cli.expire(redis_key, NICE_API_EXPIRE.SET_NICE_PASS_KEY);
    } catch (error) {
      throw error;
    }
  };

  static getNiceUserInfo = async ({ key }: { key: string }) => {
    try {
      const sub_namespace = NICE_API_SUB_NAMESPACE.USER_INFO;
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

      return data;
    } catch (error) {
      throw error;
    }
  };
}
