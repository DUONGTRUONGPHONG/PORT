import * as cherrio from "cheerio";

export const utils = {
  toNumber,
  toString,
  toBoolean,
  toNumberArray,
  toStringArray,
  dateFormat,
  generateSlugWithId,
  formattedTime,
  formateDate,
  isDev,
  log,
  domainImage,
  uid,
  isExternalUrl,
  isValidPhone,
  isTouchDevice,
  toTitleCase
};

function toNumber(value: any, _default?: number): number {
  const number = parseInt(String(value));
  return Number(
    isNaN(number) ? (_default !== undefined ? _default : 0) : number
  );
}

function toString(value: any): string {
  return String(value);
}

function toBoolean(value: any): boolean {
  const lowercaseValue = String(value).toLowerCase();
  if (lowercaseValue === "true") {
    return true;
  } else if (lowercaseValue === "false") {
    return false;
  } else {
    throw new Error("Invalid boolean string");
  }
}

function toNumberArray(value: any): number[] {
  return String(value)
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((num) => !isNaN(num));
}
function toStringArray(value: any): string[] {
  return String(value)
    .split(",")
    .map((item) => item.trim());
}

import dayjs from "dayjs";

function dateFormat(date: any, format?: string) {
  const dayjsInstance = dayjs(date);
  const formatter = format ?? "ddd, D MMM YYYY HH:mm";
  let d = dayjsInstance.format(formatter);
  return d;
}

function generateSlugWithId(prefix?: string, slug?: string, id?: number) {
  return `${prefix}/${slug}${id ? "-" + id : ""}`;
}

function formattedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function formateDate(
  date: string | Date | undefined,
  formatter: string = "HH:mm, dddd, D MMMM YYYY"
) {
  if (!date) {
    return "";
  }
  const formattedDate = useDateFormat(date, formatter, { locales: "vi-VN" });

  const dateObject = new Date(date);
  const time = formattedDate.value.slice(0, 5); // Extract HH:mm
  const day = `0${dateObject.getDate()}`.slice(-2); // Get day with leading zero
  const month = `0${dateObject.getMonth() + 1}`.slice(-2); // Get month with leading zero
  const year = dateObject.getFullYear();

  // Creating the desired format "16:21 | 04/10/2022"
  const result = ` ${day}/${month}/${year}`;

  return result;
}

function isDev() {
  return process.env.NODE_ENV === "development";
}

function log(tid: string, m: any) {
  if (isDev()) {
    console.log(
      `[${
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth()+1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
      } ]` +
        " [Task ID: " +
        tid +
        "] ",
      m
    );
  }
}

function domainImage(text: string = "", domainImage: string = "") {
  const replaceDomains = ["http://45.77.168.121:8083"];
  
  if (text) {
    const $ = cherrio.load(text, null, false);

    $("figure img").each((i, el) => {
      const src = $(el).attr("src");

      if (src && replaceDomains.some((domain) => src.startsWith(domain))) {
        const replaceDomain = replaceDomains.find((domain) =>
          src.startsWith(domain)
        )!;
        $(el).attr("src", src.replace(replaceDomain, domainImage));
      }
    });

    return $.html();
  }
}

let _id = 0

function uid () {
  _id = (_id + 1) % Number.MAX_SAFE_INTEGER
  return `vuid-${_id}`
}

function isExternalUrl(url?: string) {
  if(!url) return false
  return /^(http?:|https?:|mailto:|tel:)/.test(url)
}

function isValidPhone(phone:string){
 return /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(phone)
}

function isTouchDevice() {
  return 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;
}

function toTitleCase(str?: string){
  if (!str) return;
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
	});
}