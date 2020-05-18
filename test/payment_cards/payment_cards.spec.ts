require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("PaymentCards", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const card_id = 1774;
  const second_card_id = 2184;

  cassette
    .createTest("list", async () => {
      const cards = await lokaliseApi.paymentCards.list();
      expect(cards[0].card_id).to.eq(card_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const cards = await lokaliseApi.paymentCards.list({ page: 2, limit: 1 });
      expect(cards[0].card_id).to.eq(second_card_id);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const card = await lokaliseApi.paymentCards.get(card_id);
      expect(card.card_id).to.eq(card_id);
      expect(card.last4).to.eq("0358");
      expect(card.brand).to.eq("Visa");
      expect(card.created_at).to.eq("2019-03-19 17:49:07 (Etc/UTC)");
      expect(card.created_at_timestamp).to.eq(1553017747);
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const result = await lokaliseApi.paymentCards.delete(second_card_id);
      expect(result.card_id).to.eq(second_card_id);
      expect(result.card_deleted).to.be.true;
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const card = await lokaliseApi.paymentCards.create({
        number: "4242424242424242",
        cvc: 123,
        exp_month: 10,
        exp_year: 2030,
      });
      expect(card.last4).to.eq("4242");
      expect(card.brand).to.eq("MasterCard");
    })
    .register(this);
});
