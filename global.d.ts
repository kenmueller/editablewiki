/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
	VITE_FIREBASE_STORAGE_BUCKET: string
	VITE_FIREBASE_ADMIN_KEY: string
}

declare const VERSION: string
