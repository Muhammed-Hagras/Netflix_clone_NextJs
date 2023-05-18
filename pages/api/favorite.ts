import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currUser } = await serverAuth(req);
      // console.log({ currUser });

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      //Check if the movie does not exists
      if (!existingMovie) {
        throw new Error(`Invalid Movie Id`);
      }

      //Then update user with the favorite movie
      const user = await prismadb.user.update({
        where: { email: currUser.email || "" },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      //return the updated user with the favorite movie
      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      //Check if the movie does not exists
      if (!existingMovie) {
        throw new Error(`Invalid Movie Id`);
      }

      //Exclude the movie from the favorites list
      const updatedfavoriteIds = without(currUser.favoriteIds, movieId);

      const updatedUsers = await prismadb.user.update({
        where: { email: currUser.email || "" },
        data: {
          favoriteIds: updatedfavoriteIds,
        },
      });
      //return the updated user without the favorite movie
      return res.status(200).json(updatedUsers);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
