import cloudinary from './../config/cloudinary.js';


export const deleteFromCloudinary = async (public_id) => {
  if (!public_id) return;
  try {
    //Permanently deletes a single asset from your Cloudinary
    //The public ID value should not include a file extension.
    await cloudinary.uploader.destroy(public_id);
    console.log("Deleted from Cloudinary:",public_id);
  } catch (err) {
    console.error("Failed to delete file from Cloudinary:", err);
  }
};


export function extractCloudinaryPath(url) {
    //  works in in two steps ...url is complete path
    // url https://res.cloudinary.com/demo/image/upload/v1723456789/avatar/1755269311433-profile.jpg
    // step 1 remove everything before folder path // strip URL & version
    // after first replace ..avatar/1755269311433-profile.jpg
    // step 2 remove file extension
    // after second replace .. avatar/1755269311433-profile
    return url.replace(/^.*upload\/v\d+\//, "")
              .replace(/\.[^/.]+$/, "");        
}