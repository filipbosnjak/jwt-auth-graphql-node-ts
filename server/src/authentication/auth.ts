import { User } from "src/entity/User";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export const createAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    "FASDF",
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (user: User): string => {
  return sign(
    {
      userId: user.id,
    },
    "asdfasdgsdfgsdasdg",
    {
      expiresIn: "7d",
    }
  );
};
