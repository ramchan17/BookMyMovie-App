import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridListMain: {
    transform: "translateZ(0)",
  },
  releasedMovieGridItem: {
    margin: "15px",
    cursor: "pointer",
  },
  title: {
    color: theme.palette.primary.light,
  },
});

function ReleasedMovies(props) {
  const { releasedMovies } = props;
  const { classes } = props;
  const history = props.history;

  const movieClickHandler = (movieId) => {
    history.push("/movie/" + movieId);
  };

  return (
    <React.Fragment>
      <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
        {releasedMovies.map((movie) => (
          <GridListTile
            onClick={() => movieClickHandler(movie.id)}
            className={classes.releasedMovieGridItem}
            key={"grid" + movie.id}
          >
            <img
              src={movie.poster_url}
              className="movie-poster"
              alt={movie.title}
            />
            <GridListTileBar
              title={movie.title}
              subtitle={
                <span>
                  Release Date: {new Date(movie.release_date).toDateString()}
                </span>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  );
}

export default withStyles(styles)(ReleasedMovies);
