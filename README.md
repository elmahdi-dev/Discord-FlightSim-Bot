# Discord-FlightSim-Bot
This bot responds to two commands, the first one returns airport informations, the second one returns Metar (weather) informations of one or many airports. This data is fetched from a Laravel API.

# config.json
```json
{
  "BOT_NAME": "Name of your Bot",
  "DISCORD_TOKEN": "discord application token",
  "ICAO_API_KEY" : "ICAO api key",
  "ICAO_END_POINT" : "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/",
  "API_KEY": "Laravel API key",
  "MOD_LOGS": "Discord Logging Channel",
  "PREFIX" : "!",
  "COLORS": {
      "RED": 15158332,
      "GREEN": 3066993,
      "ORANGE": 15105570,
      "GOLD": 15844367
  }
}
```
