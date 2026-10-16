
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../../experiment1/components/MovieCard";

afterEach(() => {
  cleanup();
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const movie = {
  id: 1,
  title: "Leo",
  genre: ["Action", "Thriller"],
  language: "Tamil",
  rating: 4.5,
};

describe("MovieCard Component", () => {
  afterEach(() => {
    mockNavigate.mockClear();
  });

  it("displays movie title, genre, language and rating", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Leo")).toBeInTheDocument();
    expect(screen.getByText(/Genre:\s*Action, Thriller/)).toBeInTheDocument();
    expect(screen.getByText(/Language:\s*Tamil/)).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("displays the View Details button", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "View Details" })
    ).toBeInTheDocument();
  });

  it("navigates to the selected movie details page", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "View Details" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/movie/1");
  });
});
