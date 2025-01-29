import { OpsClient } from '@/clients/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageOpsClient implements OpsClient {
  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
  backup(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  restore(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default LocalStorageOpsClient;
