import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { exceptions } from '../../exceptions/exception.config';
import { isBytesLike, N } from 'ethers';
import { it } from 'node:test';

@Injectable()
export class Datatype2Service {
  constructor(private readonly ethersService: EthersService) { }

  async message(newMessage?: string) {
    try {
      // Todo: newMessage 유무에 따라 getMessage와 setMessage의 값을 리턴합니다.
      if (newMessage) {
        return await this.ethersService.setMessage(newMessage);
      } else {
        return await this.ethersService.getMessage();
        //throw new Error('강제로 발생시킨 에러');
      }
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async number(index?: number, number?: number) {
    try {
      // Todo: index와 number 유무에 따라 getNumber와 addNumber의 값을 리턴합니다.
      // index => getNumber 실행
      // number => addNumber 실행
      if (index !== undefined) {
        const result = await this.ethersService.getNumber(index);
        return result;
      } else if (number !== undefined) {
        const result = await this.ethersService.addNumber(number);
        return result;
      }
    } catch (error) {
      /*
        Todo: 스마트 컨트랙트에서 발생한 오류 유형에 따라 예외를 정의합니다.

        - 예외: 컨트랙트에서 에러 처리를 응답으로 반환
          → getNumber 함수 호출 시 존재하지 않는 index의 에러로 "Index out of bounds"가 반환된 경우
          → exceptions.INDEX_OUT_OF_BOUNDS 반환

          예시:
          error.reason === "Index out of bounds"

        - 예외: 그 외 오류들
          → exceptions.createBadRequestException(error.message)
      */
      if (error.reason === "Index out of bounds") {
        throw exceptions.INDEX_OUT_OF_BOUNDS;
      }

      throw exceptions.createBadRequestException(error.message);

    }
  }

  async numbers() {
    try {
      // Todo: getNumbers의 값을 리턴합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      const data = await this.ethersService.getNumbers();
      console.log("변환 전 : ", data);
      const result = data.map(item => item.toString());
      console.log("변환 후 : ", result);
      return result;
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async addName(name: string) {
    try {
      // Todo: addName의 값을 리턴합니다.
      const result = await this.ethersService.addName(name);
      return result;
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async names() {
    try {
      // Todo: getNames의 값을 리턴합니다.
      const result = await this.ethersService.getNames();
      return result;
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async balance(address: string, value?: number) {
    try {
      // Todo: value의 유무에 따라 getBalance과 setBalance의 값을 리턴합니다.
      if (value !== undefined) {
        const result = await this.ethersService.setBalance(address, value);
        return result;
      } else {
        const result = await this.ethersService.getBalance(address);
        return result;
      }
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async user(address: string, name?: string, age?: number) {
    // Todo: setUser를 실행 시 name이 빈 문자열로 들어올 경우, exceptions.NAME_CANNOT_BE_EMPTY 에러를 반환합니다.
    if (name === '') {
      throw exceptions.NAME_CANNOT_BE_EMPTY;
    }
    try {
      // Todo: name, age 유무에 따라 getUser와 setUser의 값을 리턴합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      if (name !== undefined && age !== undefined) {
        const result = await this.ethersService.setUser(address, name, age);
        return result;
      } else {
        const result = await this.ethersService.getUser(address);
        const converted = result.map(item => typeof item === 'bigint' ? item.toString() : item);
        return converted;
      }

    } catch (error) {
      /*
        Todo: 스마트 컨트랙트에서 발생한 오류 유형에 따라 예외를 정의합니다.

        - 예외: 컨트랙트에서 에러 처리를 응답으로 반환
          → getUser 함수 호출 시 존재하지 않는 user의 에러로 "User not found"가 반환된 경우
          → exceptions.USER_NOT_FOUND 반환

          예시:
          error.reason === "User not found"

        - 예외: 그 외 오류들
          → exceptions.createBadRequestException(error.message)
      */
      if (error.reason === "User not found") {
        throw exceptions.USER_NOT_FOUND;
      } else {
        throw exceptions.createBadRequestException(error.message);
      }
    }
  }

  async fixedData(data?: string) {
    try {
      // Todo: data 유무에 따라 getFixedData와 setFixedData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes32(encodeBytes32String)
      // ⚠️ data의 길이는 32바이트로 패딩해야 합니다.(zeroPadValue32)
      if (data) {
        // setFixedData

        const isBytesLike = await this.ethersService.isBytesLike(data);
        if (!isBytesLike) {
          const encoded = await this.ethersService.encodeBytes32String(data);
          const padded = await this.ethersService.zeroPadValue32(encoded);

          return await this.ethersService.setFixedData(padded);
        }

        const padded = await this.ethersService.zeroPadValue32(data);
        return await this.ethersService.setFixedData(padded);
      } else {
        // getFixedData
        return await this.ethersService.getFixedData();
      }

    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async dynamicData(data?: string) {
    try {
      // Todo: data 유무에 따라 getDynamicData와 setDynamicData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes(toUtf8Bytes)
      if (data) {
        // setDynamicData

        const isBytesLike = await this.ethersService.isBytesLike(data);
        if (!isBytesLike) {
          const bytes = await this.ethersService.toUtf8Bytes(data);
          return await this.ethersService.setDynamicData(bytes);
        }

        return await this.ethersService.setDynamicData(data);
      } else {
        // getDynamicData

        return await this.ethersService.getDynamicData();
      }
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getDetails() {
    try {
      // Todo: getDetails의 값을 리턴해야 합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      // const result = await this.ethersService.getDetails();
      // const parsed = JSON.parse(
      //   JSON.stringify(result, (key, value) =>
      //     typeof value === 'bigint' ? value.toString() : value
      //   )
      // );
      // return parsed;

      const details = await this.ethersService.getDetails();
      return details.map((detail) => {
        if (typeof detail === 'bigint') {
          return detail.toString();
        }

        return detail;
      });

    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }
}
