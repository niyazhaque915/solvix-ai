import os

print("=== SOLVIX PROJECT HEALTH CHECK ===")
src_path = "src"

if not os.path.exists(src_path):
    print("[ERROR] 'src' folder not found! Are you in the right directory?")
else:
    print("[OK] 'src' folder found.")
    
    # Check for App.tsx or main files
    files = os.listdir(src_path)
    print(f"Files in src: {files}")
    
    # Check App.tsx content for API or buttons
    app_file = os.path.join(src_path, "App.tsx")
    if os.path.exists(app_file):
        with open(app_file, "r", encoding="utf-8") as f:
            content = f.read()
            print(f"[INFO] App.tsx size: {len(content)} characters")
            if "google" in content.lower() or "auth" in content.lower():
                print("[FOUND] Google/Auth reference detected.")
            else:
                print("[MISSING] No Google Auth logic found in App.tsx.")
                
            if "gemini" in content.lower() or "groq" in content.lower() or "fetch" in content.lower():
                print("[FOUND] AI API or fetch call detected.")
            else:
                print("[MISSING] No API call logic found in App.tsx.")
    else:
        print("[WARNING] App.tsx not found.")

print("\n--- DONE ---")
print("এই স্ক্রিনশটটি আমাকে দিন!")

