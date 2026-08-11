// app/api/google-reviews/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!API_KEY || !PLACE_ID) {
      return NextResponse.json(
        { success: false, message: "Missing API configuration" },
        { status: 500 }
      );
    }

    // ============================================================
    // METHOD 1: New Places API with extended field mask
    // ============================================================
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks,reviews.authorAttribution,reviews.rating,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription,reviews.googleMapsUri",
      },
      cache: "no-store",
    });

    const data = await response.json();

    console.log("========== NEW PLACES API RESPONSE ==========");
    console.log("Status:", response.status);
    console.log("Has reviews?", data.reviews ? `Yes (${data.reviews.length})` : "No");
    console.dir(data, { depth: 3 });
    console.log("=============================================");

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Google Places API error: ${response.status}`,
          googleResponse: data,
        },
        { status: response.status }
      );
    }

    // ============================================================
    // Process reviews if they exist
    // ============================================================
    let reviews = [];

    if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
      reviews = data.reviews.map((review, index) => ({
        id: review.name || `review-${index}`,
        author: review.authorAttribution?.displayName || "Google User",
        profilePhoto: review.authorAttribution?.photoUri || null,
        rating: review.rating || 0,
        text: review.originalText?.text || review.text?.text || "",
        time: review.relativePublishTimeDescription || review.publishTime || "",
        publishTime: review.publishTime || null,
        googleMapsUri: review.googleMapsUri || null,
      }));
    }

    // ============================================================
    // METHOD 2: Try the reviews endpoint separately (if available)
    // ============================================================
    if (reviews.length === 0) {
      try {
        const reviewsUrl = `https://places.googleapis.com/v1/places/${PLACE_ID}/reviews`;

        const reviewsResponse = await fetch(reviewsUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "reviews.authorAttribution,reviews.rating,reviews.originalText,reviews.publishTime,reviews.relativePublishTimeDescription,reviews.googleMapsUri",
          },
          cache: "no-store",
        });

        const reviewsData = await reviewsResponse.json();

        if (reviewsResponse.ok && reviewsData.reviews && Array.isArray(reviewsData.reviews)) {
          reviews = reviewsData.reviews.map((review, index) => ({
            id: review.name || `review-${index}`,
            author: review.authorAttribution?.displayName || "Google User",
            profilePhoto: review.authorAttribution?.photoUri || null,
            rating: review.rating || 0,
            text: review.originalText?.text || review.text?.text || "",
            time: review.relativePublishTimeDescription || review.publishTime || "",
            publishTime: review.publishTime || null,
            googleMapsUri: review.googleMapsUri || null,
          }));
        }
      } catch (reviewsError) {
        console.log("Reviews endpoint not available:", reviewsError.message);
      }
    }

    // ============================================================
    // If STILL no reviews, use fallback with sample data
    // ============================================================
    if (reviews.length === 0) {
      console.log("No reviews found via API. Using fallback data.");

      // Fallback: Use the rating and review count from the API
      // but note that actual review text is not available
      reviews = [
        {
          id: "fallback-1",
          author: "Google User",
          profilePhoto: null,
          rating: data.rating || 4.5,
          text: `Based on ${data.userRatingCount || 29} reviews on Google Maps. Visit our Google Maps page to read what our guests say about Vaidik Lawns.`,
          time: "Recent",
          publishTime: new Date().toISOString(),
          googleMapsUri: data.googleMapsUri || null,
        }
      ];
    }

    // ============================================================
    // Return response
    // ============================================================
    return NextResponse.json({
      success: true,
      place: {
        id: data.id || PLACE_ID,
        name: data.displayName?.text || data.displayName || null,
        rating: data.rating || null,
        totalReviews: data.userRatingCount || 0,
        googleMapsUri: data.googleMapsUri || data.googleMapsLinks?.placeUri || null,
        reviewsUri: data.googleMapsLinks?.reviewsUri || null,
        writeAReviewUri: data.googleMapsLinks?.writeAReviewUri || null,
      },
      reviewCountReturned: reviews.length,
      reviews: reviews,
      debug: {
        apiVersion: "new-places-api",
        placeDetailsHadReviews: data.reviews ? true : false,
        placeDetailsReviewCount: data.reviews ? data.reviews.length : 0,
        usedFallback: reviews.length > 0 && !data.reviews,
      }
    });
  } catch (error) {
    console.error("Google Reviews Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}