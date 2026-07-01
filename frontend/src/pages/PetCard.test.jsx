import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PetCard from "./PetCard";
import api from "../api/axios";

vi.mock("../api/axios");
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: null, addNotification: vi.fn() }),
}));
vi.mock("../api/supabaseClient", () => ({ supabase: {} }));

test("отображает имя и описание питомца после загрузки", async () => {
  api.get.mockResolvedValueOnce({
    data: {
      id: "1",
      name: "Барсик",
      type: "cat",
      gender: "male",
      age: 14,
      description: "Ласковый и спокойный кот.",
      images: [],
    },
  });

  render(
    <MemoryRouter initialEntries={["/pets/1"]}>
      <Routes>
        <Route path="/pets/:id" element={<PetCard />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText("Барсик"));
  expect(screen.getByText("Ласковый и спокойный кот.")).toBeInTheDocument();
});

