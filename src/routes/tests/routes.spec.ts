import { tryParse } from "../util";
import { User, UserSchema } from "../../user/user_validation";
import * as sinon from "sinon";
import "mocha";
import { expect, assert } from "chai";
import { SafeParseReturnType, SafeParseSuccess } from "zod";

type DummyUser = {
  name?: string;
  password?: string;
  email?: string;
}

describe("Routes", () => {
  describe("User", () => {
    let userInfo: DummyUser;
    let fakeCallback = sinon.fake();
    beforeEach("beforeEach", () => {
      userInfo = {
        name: "foo",
        password: "test",
        email: "test@test.test"
      }
    })
    it("registration request validation should succeed with valid user info", () => {
      const result = tryParse(userInfo, UserSchema, fakeCallback);

      assert(fakeCallback.notCalled, "Should not have called the callback with valid data.");
      const resultUser = result as User;
      assert(resultUser.name == userInfo.name, "Name mismatch.");
      assert(resultUser.password == userInfo.password, "Password mismatch.");
      assert(resultUser.email == userInfo.email, "Email mismatch.");
    })
    it("registration request validation should fail with invalid user info", () => {
      let origUserInfo = userInfo;
      userInfo.name = undefined;
      let result = tryParse(userInfo, UserSchema, fakeCallback);

      assert(fakeCallback.calledOnce, "Should have called the callback with undefined name.");
      assert(fakeCallback.args[0][0].code == 400, "Next should have been called with code 400");
      expect((result as SafeParseReturnType<DummyUser, DummyUser>).success).to.be.false;

      userInfo = origUserInfo;
      fakeCallback = sinon.fake();
      userInfo.password = undefined;
      result = tryParse(userInfo, UserSchema, fakeCallback);

      assert(fakeCallback.calledOnce, "Should have called the callback with undefined password.")
      assert(fakeCallback.args[0][0].code == 400, "Next should have been called with code 400");
      expect((result as SafeParseReturnType<DummyUser, DummyUser>).success).to.be.false;

      userInfo = origUserInfo;
      fakeCallback = sinon.fake();
      userInfo.email = "aBadlyFormattedEmail";
      result = tryParse(userInfo, UserSchema, fakeCallback);

      assert(fakeCallback.calledOnce, "Should have called the callback with badly formatted email.")
      assert(fakeCallback.args[0][0].code == 400, "Next should have been called with code 400");
      expect((result as SafeParseReturnType<DummyUser, DummyUser>).success).to.be.false;
    })
  })
})