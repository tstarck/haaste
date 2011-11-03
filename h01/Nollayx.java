
import java.util.Scanner;
import java.util.InputMismatchException;
import java.util.NoSuchElementException;
import java.lang.NegativeArraySizeException;

/**
 * @author Tuomas Starck
 */
public class Nollayx {
	private static Scanner lue = new Scanner(System.in);

	private static void raapustaRuudukko(int koko) {
		int raja = koko;
		String nollayx = "";
		String yxnolla = "";

		for (int i=0; i<koko; i++) {
			nollayx += (i%2);
		}
		for (int i=1; i<=koko; i++) {
			yxnolla += (i%2);
		}

		do {
			raja--;
			System.out.println(nollayx);

			if (raja <= 0) break;

			System.out.println(yxnolla);
			raja--;
		}
		while (raja > 0);
	}

	/**
	 * @param argv Unused
	 */
	public static void main(String[] argv) {
		int luku = 0;

		try {
			System.out.print("Kuinkas iso saisi olla? ");

			luku = lue.nextInt();

			if (luku < 0) {
				throw new NegativeArraySizeException();
			}
		}
		catch (InputMismatchException ime) {
			System.out.println("Ei sovi.");
		}
		catch (NoSuchElementException nsee) {
			System.out.println("\nOk.");
		}
		catch (NegativeArraySizeException nase) {
			System.out.println("Täällä ei vitsiniekkoja palvella.");
		}

		System.out.println();

		if (luku > 0) {
			raapustaRuudukko(luku);
		}
	}
}
