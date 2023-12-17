import Api from "../Classes/Api";
const serverApi = new Api();
export const fileLoadUrl = serverApi.url('fs');
export const getFileUrl = fsId => serverApi.url(`fs/${fsId}`);
