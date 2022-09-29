/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 --------------
 ******/

/* Example
 * 
 * This is an example Jest test for the MathLib example module.
 * 
 */

import { expect } from "chai";
import { MathLib } from "../../../src/lib/math";

describe ('MathLib', () => {
  describe("test add function", () => {
    it("should return 15 for add(10,5)", () => {
      expect(MathLib.add(10, 5)).to.equal(15)
    })
  
    it("should return 5 for add(2,3)", () => {
      expect(MathLib.add(2, 3)).to.equal(5)
    })
  })

  describe("test mul function", () => {
    it("should return 15 for mul(3,5)", () => {
      expect(MathLib.mul(3, 5)).to.equal(15)
    })
  })
})
