FROM zodern/meteor
COPY --chown=app:app ./dist/bundle /bundle
RUN cd /bundle/programs/server && npm install
