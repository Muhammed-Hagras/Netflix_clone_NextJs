import useCurrUser from "@/hooks/useCurrUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface favoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<favoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currUser, mutate } = useCurrUser();

  //check if this movie is in favorites
  const isFavorite = useMemo(() => {
    const list = currUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("api/favorite", { movieId });
    }

    const updatedfavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currUser,
      favoriteIds: updatedfavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currUser, mutate, mutateFavorites]);

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 
    border-white border-2 rounded-full 
    flex justify-center items-center transition hover:border-neutral-300
    "
    >
      <AiOutlinePlus className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
