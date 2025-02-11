# Hydrion-S3LFB0T

## Quick Setup

### For Windows Users 💻

1. Install **Git** from https://git-scm.com/download/win and **Node.js** from https://nodejs.org/en/download/.
2. Open **Powershell** AS **Administrator** and run the following command to allow the Running of local scripts:

```bash
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

3. Download **setup.ps1** into your selfbot folder and run the command below:

```bash
.\setup.ps1
```

---

### For Termux (Android Mobile Users) 📱

1. Install **Termux** from the Google Play Store.
2. Open **Termux** and run the following commands:

```bash
pkg install git -y
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T
bash setup.sh
```

3. To edit the **config.json** Use the command below

```bash
nano config.json
```

This will install all the required dependencies and set up the bot.

---

### Additional intrustions (MUST READ)

1. To **Start** the Selfbot in regular scenarios use the Command below:

For Android/Linux

```bash
cd Hydrion-S3LFB0T
bash start.sh
```

For Windows:

```bash
.\ start.ps1
```

2. To **Update** The Selfbot use The Command below:

For Android/Linux

```bash
bash update.sh
```

For Windows:

```bash
.\update.ps1
```

---

## Configuration ⚙️

After the setup, you will be prompted to enter your **Discord Token**. This is required to run the bot. The token will be saved in a `config.json` file, which the bot will read during execution.

---

### Contact 📩

If you have any questions or need support, feel free to contact us via the [Hydrion Support Discord](https://discord.gg/6Tufbvnebj).

---

## Support US by starring the repo and join our server [Hydrion Discord](https://discord.gg/6Tufbvnebj)

---

**Selfbot crafted by** `@hydradevx` 🎨
