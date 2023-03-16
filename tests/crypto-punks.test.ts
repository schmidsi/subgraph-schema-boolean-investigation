import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
  log,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Assign } from "../generated/schema";
import { Assign as AssignEvent } from "../generated/CryptoPunks/CryptoPunks";
import { handleAssign } from "../src/crypto-punks";
import { createAssignEvent } from "./crypto-punks-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let to = Address.fromString("0x0000000000000000000000000000000000000001");
    let punkIndex = BigInt.fromI32(234);
    let newAssignEvent = createAssignEvent(to, punkIndex);
    handleAssign(newAssignEvent);

    let stored = Assign.load(
      Bytes.fromHexString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000")
    )!;

    let value = stored.test;

    // log.info("Stored entity: {}", [stored.test.toString()]);

    logStore(); // Uncomment to print the store
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Assign created and stored", () => {
    assert.entityCount("Assign", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Assign",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "to",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "Assign",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "punkIndex",
      "234"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
