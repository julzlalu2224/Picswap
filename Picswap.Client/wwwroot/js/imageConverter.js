// Image Converter JavaScript Module
// Handles client-side image conversion, resizing, and downloading

window.imageConverter = {
    /**
     * Converts an image to a different format with optional resizing
     * @param {string} dataUrl - Source image data URL
     * @param {string} targetMimeType - Target format (image/png or image/webp)
     * @param {number} quality - Compression quality (0.0 to 1.0)
     * @param {number} targetWidth - Target width (0 to keep original)
     * @param {number} targetHeight - Target height (0 to keep original)
     * @returns {Promise<{dataUrl: string, size: number}>}
     */
    convertImage: function(dataUrl, targetMimeType, quality, targetWidth, targetHeight) {
        return new Promise((resolve, reject) => {
            try {
                const img = new Image();
                
                img.onload = function() {
                    try {
                        // Create canvas
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        if (!ctx) {
                            reject(new Error('Could not get canvas context'));
                            return;
                        }

                        // Calculate dimensions
                        let width = img.width;
                        let height = img.height;

                        if (targetWidth > 0 && targetHeight > 0) {
                            // Resize to exact dimensions
                            width = targetWidth;
                            height = targetHeight;
                        } else if (targetWidth > 0) {
                            // Resize by width, maintain aspect ratio
                            const ratio = targetWidth / img.width;
                            width = targetWidth;
                            height = img.height * ratio;
                        } else if (targetHeight > 0) {
                            // Resize by height, maintain aspect ratio
                            const ratio = targetHeight / img.height;
                            height = targetHeight;
                            width = img.width * ratio;
                        }

                        // Set canvas size
                        canvas.width = width;
                        canvas.height = height;

                        // Enable image smoothing for better quality
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';

                        // Draw image
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convert to target format
                        const convertedDataUrl = canvas.toDataURL(targetMimeType, quality);

                        // Calculate size
                        const base64Data = convertedDataUrl.split(',')[1];
                        const binaryData = atob(base64Data);
                        const size = binaryData.length;

                        resolve({
                            dataUrl: convertedDataUrl,
                            size: size
                        });
                    } catch (error) {
                        reject(error);
                    }
                };

                img.onerror = function() {
                    reject(new Error('Failed to load image'));
                };

                img.src = dataUrl;
            } catch (error) {
                reject(error);
            }
        });
    },

    /**
     * Downloads a data URL as a file
     * @param {string} dataUrl - The data URL to download
     * @param {string} fileName - The name for the downloaded file
     */
    downloadImage: function(dataUrl, fileName) {
        try {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download error:', error);
            alert('Error downloading image: ' + error.message);
        }
    },

    /**
     * Batch convert multiple images
     * @param {Array<{dataUrl: string, quality: number, targetWidth: number, targetHeight: number}>} images
     * @param {string} targetMimeType
     * @returns {Promise<Array>}
     */
    batchConvert: async function(images, targetMimeType) {
        const results = [];
        
        for (const img of images) {
            try {
                const result = await this.convertImage(
                    img.dataUrl,
                    targetMimeType,
                    img.quality || 0.9,
                    img.targetWidth || 0,
                    img.targetHeight || 0
                );
                results.push({ success: true, ...result });
            } catch (error) {
                results.push({ success: false, error: error.message });
            }
        }
        
        return results;
    },

    /**
     * Get image dimensions
     * @param {string} dataUrl
     * @returns {Promise<{width: number, height: number}>}
     */
    getImageDimensions: function(dataUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = function() {
                resolve({
                    width: img.width,
                    height: img.height
                });
            };

            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };

            img.src = dataUrl;
        });
    },

    /**
     * Compress image (same format, reduced quality)
     * @param {string} dataUrl
     * @param {number} quality
     * @returns {Promise<{dataUrl: string, size: number}>}
     */
    compressImage: async function(dataUrl, quality) {
        // Detect source format
        let mimeType = 'image/jpeg';
        if (dataUrl.startsWith('data:image/png')) {
            mimeType = 'image/png';
        } else if (dataUrl.startsWith('data:image/webp')) {
            mimeType = 'image/webp';
        }
        
        return this.convertImage(dataUrl, mimeType, quality, 0, 0);
    }
};

// Theme management helper
window.themeManager = {
    setTheme: function(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    
    getTheme: function() {
        return document.documentElement.classList.contains('dark');
    },
    
    initTheme: function() {
        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const isDark = savedTheme !== null ? savedTheme === 'true' : prefersDark;
        this.setTheme(isDark);
        
        return isDark;
    }
};

// Initialize theme on load
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager.initTheme();
});
