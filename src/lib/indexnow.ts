const INDEXNOW_KEY = "5d8984db49a44927b5270316bf5425c3";

export async function submitToIndexNow(host: string, url: string) {
  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList: [url],
      }),
    });

    if (response.ok) {
      console.log(`Successfully submitted ${url} to IndexNow`);
    } else {
      const errorText = await response.text();
      console.error(`Failed to submit ${url} to IndexNow:`, errorText);
    }
  } catch (error) {
    console.error(`Error submitting ${url} to IndexNow:`, error);
  }
}
