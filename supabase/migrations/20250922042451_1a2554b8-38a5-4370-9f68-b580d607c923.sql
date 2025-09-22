-- Make Image_Source_CharDham bucket public so thumbnails can be displayed
UPDATE storage.buckets 
SET public = true 
WHERE id = 'Image_Source_CharDham';