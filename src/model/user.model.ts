import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import config from "config";

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: true })
  name: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true })
  occupation: string;

  @prop({ default: null })
  password: string;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return bcrypt
        .compare(candidatePassword, this.password)
        .catch((e) => false);
    } catch (error) {
      console.log("Couldn't validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
