import { gql } from 'apollo-server';
export const typeDefs = gql`
    type Storage {
        state: MeetingState!
        start: Int!
        rooms: [Room]!
        totalParticipants: [Participant]!
    }
    enum MeetingState {
        PENDING
        INPROGRESS
        COMPLETE
    }
    type Room {
        sid: ID!
        uniqueName: String!
        participants: [Participant]
    }
    type Participant {
        id: String!
        name: String!
        token: String!
        status: ParticipantStatus!
    }
    enum ParticipantStatus {
        CALLING
        WAITING
    }
    type VideoTokenRequest {
        identity: String!
        uniqueName: String!
    }

    type Token {
        token: String!
    }

    type Query {
        token(uniqueName: String!, identity: String!): Token
        room(sid: ID!): Room
        rooms: [Room]
    }

    type Mutation {
        newRoom(uniqueName: String!): Room
    }
`;
