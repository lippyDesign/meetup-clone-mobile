import axios from 'axios';
import { Platform } from 'react-native';

const url = Platform.OS === 'ios' ? 'http://localhost:3000/api' : 'http://10.0.3.2:3000/api';

axios.defaults.baseURL = url;

const fakeGroupId = '599cad0e1d3295d3aca98a2a';

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    this.path = `/groups/${this.groupId}/meetups`;
  }

  async fetchGroupMeetups() {
    try {
      const { data } = await axios.get(this.path);
      return data.meetups;
    } catch (e) {
      console.log(e);
    }
  }

  async createGroupMeetup(args) {
    try {
      const res = await axios.post(`${this.path}/new`, args);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}

export { MeetupApi };
