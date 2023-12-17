import Encryption from "./Encryption";
class Storage extends Encryption {

  ResetPasswordApiKey(value) {
    return this.encode(value);
  }

}
export default new Storage();