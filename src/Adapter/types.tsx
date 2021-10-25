/* eslint-disable no-unused-vars */
export interface Hour {
  officeHour: string;
  minWH: string;
}

export interface leaveType {
  userid: string;
  status: string;
  name: string;
  dept: string;
  type: string;
  days: number;
  reason: string;
  message: string;
  appliedOn: string;
}

export interface empType {
  id?: string;
  pincode?: string;
  username: string;
  dept: string;
  role: string;
  email: string;
  phone?:string;
  profilePic?:string;
}

export interface individualRecType {
  date: string;
  punchIn: string;
  punchOut: string;
  workHours?: number;
}

export interface recordType {
  id: string;
  Records: individualRecType[];
}

export interface initialStateTypes {
  requestedLeaves: leaveType[];
  employees: empType[];
  records: recordType[];
}

export interface initialStateType {
  allUsers: empType[];
  userRecords: recordType[];
  activeUser: any;
  leaves: leaveType[];
}
export interface Data_ {
  available: string[];
  unavailable: string[];
  onleave: string[];
}

export interface workType {
  id: string;
  totalHours: number;
  averageHours: number;
}

export interface allEmpType {
  id: string;
  pin?: string;
  status?: string;
}
