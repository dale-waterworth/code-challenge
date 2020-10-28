package com.dale;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class LogoLocoTest {
    private LogoLoco logoLoco;
    
    @BeforeEach
    void beforeEach(){
        logoLoco = new LogoLoco();
    }

    @Test
    void convertsToGrid() {
        var t1File = "1.txt";

        var grid = logoLoco.wordsToGrid(t1File);

        assertAll("matches",
                () -> assertEquals(grid.getX(), 8),
                () -> assertEquals(grid.getY(), 10),
                // top left
                () -> assertEquals(grid.getTextMatrix()[0][0], "T"),
                // bottom right
                () -> assertEquals(grid.getTextMatrix()[grid.getY()][grid.getX()], "P")
        );
    }

    @Test
    void findsHorizontalWords() {
        var t1File = "1.txt";

        var grid = logoLoco.wordsToGrid(t1File);

        var horizontalWords = logoLoco.findHorizontal(grid);

        assertAll("matches",
                () -> assertEquals(horizontalWords.get(0), "HAPPY"),
                () -> assertEquals(horizontalWords.get(1), "FISHING")
        );

    }
    
    @Test
    void findsVerticalWords() {
        var t1File = "1.txt";

        var grid = logoLoco.wordsToGrid(t1File);

        var verticalWords = logoLoco.findVertical(grid);

        assertAll("matches",
                () -> assertEquals(verticalWords.get(0), "THE"),
                () -> assertEquals(verticalWords.get(1), "PENGUIN"),
                () -> assertEquals(verticalWords.get(2), "GROUP")
        );
    }
  
    
    @Test
    void getAllFromFile1(){
        var actual = logoLoco.processFile("1.txt");
        var expected = Arrays.asList("HAPPY", "FISHING", "THE", "PENGUIN", "GROUP");

        assertTrue(expected.containsAll(actual));
    }    
    
    @Test
    void getAllFromFile2(){
        var actual = logoLoco.processFile("2.txt");
        var expected = Arrays.asList("STEVE", "BAKERS", "LTD", "TACKLE", "SUPPLIER");

        assertTrue(expected.containsAll(actual));
    }    
    
    @Test
    void getAllFromFile3(){
        var actual = logoLoco.processFile("3.txt");
        var expected = Arrays.asList("HONEST", "WHOLESOME", "EMPORIUM", "JOES", "MEAT");

        assertTrue(expected.containsAll(actual));
    }  
    
    @Test
    void getAllFromFile4(){
        var actual = logoLoco.processFile("4.txt");
        var expected = Arrays.asList("BILL", "BURIALS", "BUDGET", "BENS");

        assertTrue(expected.containsAll(actual));
    }    
    
    @Test
    void getAllFromFile5(){
        var actual = logoLoco.processFile("5.txt");
        var expected = Arrays.asList("HOPE", "CENTER", "EDWARD", "ADULTS", "HOUSE", "AND", "STUDYL", "FOR");

        assertTrue(expected.containsAll(actual));
    }
}