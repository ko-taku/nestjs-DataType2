import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ethers,
  zeroPadValue,
  encodeBytes32String,
  isBytesLike,
  toUtf8Bytes,
  BytesLike,
  toUtf8String,
} from 'ethers';
import { abi, address } from '../../abis/DataType2.json';

@Injectable()
export class EthersService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey!, this.provider);
    this.contract = new ethers.Contract(address, abi, this.signer);
  }

  async zeroPadValue32(data: string) {
    return zeroPadValue(data, 32);
  }

  async encodeBytes32String(data: string) {
    return encodeBytes32String(data);
  }

  async isBytesLike(data: string) {
    return isBytesLike(data);
  }

  async toUtf8Bytes(data: string): Promise<Uint8Array> {
    return toUtf8Bytes(data);
  }

  async toUtf8String(data: BytesLike): Promise<string> {
    return toUtf8String(data);
  }

  // 위 코드는 지우지 마세요.

  async getMessage() {
    // Todo: getMessage의 값을 리턴합니다.
    const result = await this.contract.getMessage();
    return result;
  }

  async setMessage(newMessage: string) {
    // Todo: setMessage의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.setMessage(newMessage);
    const result = await tx.wait();
    return result;
  }

  async getNumber(index: number) {
    // Todo: getNumber의 값을 리턴합니다.
    const result = await this.contract.getNumber(index);
    return result;
  }

  async addNumber(num: number) {
    // Todo: addNumber의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.addNumber(num);
    const result = await tx.wait();
    return result;
  }

  async getNumbers() {
    // Todo: getNumbers의 값을 리턴합니다.
    const result = await this.contract.getNumbers();
    return result;
  }

  async addName(name: string) {
    // Todo: addName의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.addName(name);
    const result = await tx.wait();
    return result;
  }

  async getNames() {
    // Todo: getNames의 값을 리턴합니다.
    const result = await this.contract.getNames();
    return result;
  }

  async setBalance(address: string, value: number) {
    // Todo: setBalance의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.setBalance(address, value);
    const result = await tx.wait();
    return result;
  }

  async getBalance(address: string) {
    // Todo: getBalance의 값을 리턴합니다.
    const result = await this.contract.getBalance(address);
    return result;
  }

  async getUser(address: string) {
    // Todo: getUser의 값을 리턴합니다.
    const result = await this.contract.getUser(address);
    return result;
  }

  async setUser(address: string, name: string, age: number) {
    // Todo: setUser의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.setUser(address, name, age);
    const result = await tx.wait();
    return result;
  }

  async getDynamicData() {
    // Todo: getDynamicData의 값을 리턴합니다.
    const result = await this.contract.getDynamicData();
    return result;
  }

  async setDynamicData(data: BytesLike) {
    // Todo: setDynamicData의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.setDynamicData(data);
    const result = await tx.wait();
    return result;
  }

  async getFixedData() {
    // Todo: getFixedData의 값을 리턴합니다.
    const result = await this.contract.getFixedData();
    return result;
  }

  async setFixedData(data: string) {
    // Todo: setFixedData의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)
    const tx = await this.contract.setFixedData(data);
    const result = await tx.wait();
    return result;
  }

  async getDetails() {
    // Todo: getDetails의 값을 리턴합니다.
    const result = await this.contract.getDetails();
    return result;
  }
}
