// webdriverio as W3C capabilities
const wdio = require("webdriverio");
const assert = require("assert");

const sleep = (t) => new Promise((r) => setTimeout(r, t));
const scrollDown = async (client) => {
  await client.touchAction([
    { action: "longPress", x: 0, y: 2000 },
    { action: "moveTo", x: 0, y: 1 },
    "release",
  ]);

  await client.touchAction([
    { action: "longPress", x: 0, y: 1500 },
    { action: "moveTo", x: 0, y: 1 },
    "release",
  ]);
};

const main = async () => {
  const client = await wdio.remote({
    path: "/wd/hub",
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "11",
      deviceName: "Android Emulator",
      app: "ApiDemos-debug.apk",
      appPackage: "io.appium.android.apis",
      automationName: "UiAutomator2",
    },
  });

  const ViewsField = await client.$('//android.widget.TextView[@text="Views"]');
  await ViewsField.click();

  await sleep(3000);

  await scrollDown(client);

  await sleep(1000);
  const TextSwitcherField = await client.$(
    '//android.widget.TextView[@text="TextSwitcher"]'
  );

  await TextSwitcherField.click();

  await sleep(1000);

  const NextButton = await client.$('//android.widget.Button[@text="Next"]');

  await NextButton.click();
  await NextButton.click();
  await NextButton.click();
  await NextButton.click();

  await sleep(3000);

  const TextField = await client
    .$("//android.widget.TextSwitcher")
    .$("//android.widget.TextView");
  const text = await TextField.getText();

  assert.strictEqual(text, "4");

  await sleep(20000);
  await client.deleteSession();
};

main();
