import { ipcMain, dialog, app } from 'electron';
import Member from '../models/mongoSchema.js';
import fs from 'fs';
import path from 'path';
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

let cloudinaryConfigured = false;


try {
  if (
    process.env.CLOUD_NAME &&
    process.env.CLOUD_API_KEY &&
    process.env.CLOUD_API_SECRET
  ) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    cloudinaryConfigured = true;
    console.log("Cloudinary configured from .env");
  } else {
    console.error("Missing Cloudinary credentials in .env");
  }
} catch (err) {
  console.error("Error loading config:", err);
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

