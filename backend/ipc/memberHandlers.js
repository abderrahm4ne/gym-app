import { ipcMain, dialog, app } from 'electron';
import Member from '../models/mongoSchema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname,"config.json");

let config;
let cloudinaryConfigured = false;

console.log("Looking for config at:", configPath);

try {
  if (!fs.existsSync(configPath)) {
    console.error("Config file does not exist at:", configPath);
    const defaultConfig = {
      cloudinary: {
        cloud_name: "",
        api_key: "",
        api_secret: ""
      }
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log("Created default config file at:", configPath);
    config = defaultConfig;
  } else {
    const configData = fs.readFileSync(configPath, "utf-8");
    console.log("Raw config data:", configData);
    
    config = JSON.parse(configData);
    console.log("Parsed config:", config);
    
    let cloudinaryConfig = config;
    if (config.cloudinary) {
      cloudinaryConfig = config.cloudinary;
      console.log("Using nested cloudinary config");
    } else {
      console.log("Using root-level config");
    }
    
    if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
      if (cloudinaryConfig.cloud_name !== "" && 
          cloudinaryConfig.api_key !== "" && 
          cloudinaryConfig.api_secret !== "") {
        
        console.log("Config values are present and not empty");
        cloudinary.v2.config({
          cloud_name: cloudinaryConfig.cloud_name,
          api_key: cloudinaryConfig.api_key,
          api_secret: cloudinaryConfig.api_secret
        });
        
        cloudinaryConfigured = true;
        console.log("Cloudinary configured successfully");
      } else {
        console.error("Cloudinary config values are empty strings");
      }
    } else {
      console.error("Cloudinary config missing required fields");
      console.error("Available fields:", Object.keys(cloudinaryConfig));
    }
  }
} catch (err) {
  console.error("Error loading config:", err);
}

if (cloudinaryConfigured) {
  console.log("Testing Cloudinary connection...");
  cloudinary.v2.api.ping()
    .then(result => console.log("Cloudinary ping successful:", result))
    .catch(error => console.error("Cloudinary ping failed:", error));
} else {
  console.error("Cloudinary is not configured. Please update your config.json file.");
}

const noteFilePath = path.join(app.getPath("userData"), "note.txt");

export function memberHandlers() {

  ipcMain.handle('add-member', async (e, memberData) => {
    try {
      const newMember = new Member(memberData);
      await newMember.save();
      return { success: true, message: 'Member added successfully' };
    } catch (err) {
      console.error('Error adding member:', err);
      return { success: false, message: 'Database error (add member)', err };
    }
  });

 ipcMain.handle("get-members", async () => {
  try {
    const members = await Member.find();
    const cleanMembers = members.map(m => m.toObject({ virtuals: true }));
    return { success: true, members: cleanMembers };
  } catch (err) {
    return { success: false, error: "Database error (get all members)", err };
  }
});

ipcMain.handle("get-member", async (event, id) => {
  try {
    const member = await Member.findById(id);
    if (!member) return { success: false, error: "Member not found" };
    return { success: true, member: member.toObject() };
  } catch (err) {
    return { success: false, error: "Database error (get-member)", err};
  }
});

ipcMain.handle("update-member", async (event, id, updatedFields) => {
  try {
    const updated = await Member.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updated) {
      return { success: false, error: "Member not found for update" };
    }

    return { success: true, member: updated.toObject() };
  } catch (err) {
    return { success: false, error: "Database error (update-member)", err};
  }
});

ipcMain.handle("renew-member", async (event, id, renewalData) => {
  try {
    const { startDate, endDate, months } = renewalData;

    const updated = await Member.findByIdAndUpdate(
      id,
      {
        startDate,
        endDate,
        monthsOfMemberShips: months
      },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Member not found for renewal" };
    }

    return { success: true, member: updated.toObject() };
  } catch (err) {
    console.error("Renew error:", err);
    return { success: false, error: "Database error (renew-member)", err };
  }
});


ipcMain.handle("delete-member", async (event, id) => {
    try {
      const deleted = await Member.findByIdAndDelete(id);

      if (!deleted) {
        return { success: false, error: "Member not found for deletion" };
      }

      return { success: true, message: "Member deleted successfully" };
    } catch (err) {
      console.error("Delete error:", err);
      return { success: false, error: "Database error (delete-member)", err };
    }
  });

ipcMain.handle('open-file-dialog', async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg', 'gif'] }]
  });
  return canceled ? null : filePaths[0];
});

ipcMain.handle('update-photo', async (event, memberId, fileBuffer) => {
  if (!cloudinaryConfigured) {
    return { 
      success: false, 
      error: "Cloudinary not configured. Please check your config.json file." 
    };
  }
  
  try {
    const tempPath = path.join(app.getPath('temp'), `${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, Buffer.from(fileBuffer));
    
    const result = await cloudinary.v2.uploader.upload(tempPath, {
      folder: "gym-members",
      width: 500,
      height: 500,
      crop: "fill"
    });

    const updated = await Member.findByIdAndUpdate(
      memberId,
      { photo: result.secure_url },
      { new: true }
    );

    fs.unlinkSync(tempPath);

    return { success: true, member: updated.toObject() };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: error.message };
  }
}); 

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
});

ipcMain.handle("load-note", async () => {
    try {
        if (fs.existsSync(noteFilePath)) {
            return fs.readFileSync(noteFilePath, "utf-8");
        }
        return "";
    } catch (err) {
        console.error("Failed to load note:", err);
        return "";
    }
});

ipcMain.on("save-note", (_event, noteContent) => {
    console.log("Received note to save:", noteContent);
    try {
        fs.writeFileSync(noteFilePath, noteContent ?? "", "utf-8");
        console.log("Note saved to:", noteFilePath);
    } catch (err) {
        console.error("Failed to save note:", err);
    }
});


}
