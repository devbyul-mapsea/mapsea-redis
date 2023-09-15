import { standard_cli } from '../../../../core/config/redis';
import {
  NiceApiNameSpaceEnum,
  NiceApiSubNameSpaceEnum,
  REDIS_ERROR_CODE,
  REDIS_ERROR_MESSAGE,
} from '../../../../core/enum';
import { ERROR_CODE_BUILDER } from '../../../../core/error';

enum NICE_API_EXPIRE {
  SET_NICE_PASS_KEY = 3600,
}

export class OpenApiNiceService {
  private static setKey = (id: string, key: string) => {
    const namespace = NiceApiNameSpaceEnum.NICE;
    const sub_namespace = id;

    return namespace + ':' + sub_namespace + ':' + key;
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
      const redis_key = this.setKey(NiceApiSubNameSpaceEnum.ENCRYPT, key);

      const key_check = await standard_cli.exists(redis_key);
      if (key_check > 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DUPLICATE_KEY_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DUPLICATE_KEY_ERROR)
          .setData({ key })
          .build();
      }

      const bool = await standard_cli.hSet(redis_key, value);

      if (bool === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.INSERTION_FAILED_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.INSERTION_FAILED_ERROR)
          .setData({ key })
          .build();
      }

      await standard_cli.expire(redis_key, NICE_API_EXPIRE.SET_NICE_PASS_KEY);
    } catch (error) {
      throw error;
    }
  };

  static getNicePassKey = async ({ key }: { key: string }) => {
    try {
      const redis_key = this.setKey(NiceApiSubNameSpaceEnum.ENCRYPT, key);
      const key_check = await standard_cli.exists(redis_key);
      if (key_check === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DATA_NOT_FOUND_ERROR)
          .setData({ key })
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
      const redis_key = this.setKey(NiceApiSubNameSpaceEnum.USER_INFO, key);
      const key_check = await standard_cli.exists(redis_key);
      if (key_check > 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DUPLICATE_KEY_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DUPLICATE_KEY_ERROR)
          .setData({ key })
          .build();
      }

      const bool = await standard_cli.hSet(redis_key, value);

      if (bool === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.INSERTION_FAILED_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.INSERTION_FAILED_ERROR)
          .setData({ key })
          .build();
      }

      await standard_cli.expire(redis_key, NICE_API_EXPIRE.SET_NICE_PASS_KEY);
    } catch (error) {
      throw error;
    }
  };
  static getNiceUserInfo = async ({ key }: { key: string }) => {
    try {
      const redis_key = this.setKey(NiceApiSubNameSpaceEnum.USER_INFO, key);
      const key_check = await standard_cli.exists(redis_key);
      if (key_check === 0) {
        throw new ERROR_CODE_BUILDER()
          .forCode(REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR)
          .setMessage(REDIS_ERROR_MESSAGE.DATA_NOT_FOUND_ERROR)
          .setData({ key })
          .build();
      }

      const data = await standard_cli.hGetAll(redis_key);

      return data;
    } catch (error) {
      throw error;
    }
  };
}
