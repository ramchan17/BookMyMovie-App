import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import allConstants from "../../constants";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
});

const UpcomingMovies = (props) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const { baseUrl, getData } = allConstants;
  const { classes } = props;

  const fetchMovies = async () => {
    const fetchedMovies = await getData(
      baseUrl + "movies?status=PUBLISHED&limit=8"
    );
    setUpcomingMovies(fetchedMovies.movies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.upcomingMoviesHeading}>
        <span>Upcoming Movies</span>
      </div>

      <GridList cols={6} className={classes.gridListUpcomingMovies}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={"upcoming" + movie.id}>
            <img
              src={movie.poster_url}
              className="movie-poster"
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  );
};

export default withStyles(styles)(UpcomingMovies);
